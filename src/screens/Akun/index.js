import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {AkunInput, DialogKonfirmasi} from '../../components';
import {colors} from '../../res/colors';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {baseUrl} from '../../helpers';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import Info from '../../components/molecules/Info';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const Akun = ({route, navigation}) => {
  const {anggota} = route.params;
  const [visible, setVisible] = useState(false);
  const [foto, setFoto] = useState(anggota.foto);
  const [upload, setUpload] = useState(null);
  const [nomor_telepon, setNomorTelepon] = useState(anggota.nomor_telepon);
  const [alamat, setAlamat] = useState(anggota.alamat);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const [sukses, setSukses] = useState(false);

  const openGalery = async () => {
    try {
      const image = await launchImageLibrary(options);
      setFoto(image.assets[0].uri);
      setUpload({
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: image.assets[0].fileName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAnggota = async () => {
    setVisible(false);
    let formData = new FormData();
    if (upload) {
      formData.append('foto', upload);
    }
    formData.append('nomor_telepon', nomor_telepon);
    formData.append('alamat', alamat);
    try {
      setLoading(true);
      await axios({
        method: 'put',
        url: `${baseUrl}/anggota/${anggota.id}`,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      setSukses(true);
    } catch (error) {
      console.log('error:', error.response.data);
      setSukses(false);
    } finally {
      setLoading(false);
      setInfo(true);
    }
  };

  return (
    <SafeAreaView style={styles.detailContainer}>
      <DialogKonfirmasi
        type="simpan"
        visible={visible}
        batal={() => setVisible(false)}
        ok={handleEditAnggota}
      />
      <ScrollView contentContainerStyle={styles.detail}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LihatGambar', {
                gambar: foto,
              })
            }
            style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: foto,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={openGalery} style={styles.camera}>
            <Feather name="camera" color={colors.textLight} size={ms(20)} />
          </TouchableOpacity>
          <AkunInput label="Nama" defaultValue={anggota.nama} />
          <AkunInput
            label="Nomor Induk Siswa"
            defaultValue={anggota.nomor_induk_siswa}
          />
          <AkunInput label="Kelas" defaultValue={anggota.kelas} />
          <AkunInput
            label="Jenis Kelamin"
            defaultValue={anggota.jenis_kelamin}
          />
          <AkunInput
            label="Nomor Telepon"
            enable={true}
            defaultValue={anggota.nomor_telepon}
            onChangeText={text => setNomorTelepon(text)}
          />
          <AkunInput
            label="Alamat"
            enable={true}
            defaultValue={anggota.alamat}
            onChangeText={text => setAlamat(text)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <AntDesign name="arrowleft" color={colors.textDark} size={ms(20)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={styles.save}>
        <Feather name="save" color={colors.textDark} size={ms(20)} />
      </TouchableOpacity>
      <LoadingOverlay loading={loading} />
      {info && (
        <Info
          sukses={sukses}
          pesan={
            sukses ? 'Berhasil mengupdate profil' : 'Gagal mengupdate profil'
          }
          ok={() => {
            setInfo(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Akun;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  detail: {
    flexGrow: 1,
    backgroundColor: colors.primaryWhite,
    alignItems: 'center',
  },
  imageContainer: {
    height: ms(240),
    width: '100%',
    borderBottomColor: colors.background,
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    padding: ms(12),
    borderRadius: ms(8),
    width: '100%',
  },
  back: {
    position: 'absolute',
    left: ms(12),
    top: ms(12),
    width: ms(32),
    height: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: ms(16),
    borderWidth: 1,
    borderColor: colors.background,
  },
  save: {
    position: 'absolute',
    right: ms(12),
    top: ms(12),
    width: ms(32),
    height: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: ms(16),
    borderWidth: 1,
    borderColor: colors.background,
  },
  camera: {
    width: ms(48),
    height: ms(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: ms(24),
    borderWidth: 2,
    borderColor: colors.background,
    position: 'absolute',
    top: ms(-24),
    right: ms(12),
  },
  name: {
    position: 'absolute',
    left: ms(12),
    bottom: ms(12),
  },
  tombol: {
    position: 'absolute',
    width: '100%',
    bottom: ms(24),
    paddingHorizontal: '5%',
  },
});
