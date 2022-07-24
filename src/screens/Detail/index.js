import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../res/colors';
import {CustomButton, DialogKonfirmasi, Gap} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {baseUrl} from '../../helpers';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import {navigate} from '../../helpers/navigate';
import Info from '../../components/molecules/Info';

const Detail = ({route, navigation}) => {
  const {token} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [detailbuku, setDetailBuku] = useState({});
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const [sukses, setSukses] = useState(false);
  const [message, setMessage] = useState('');

  const getDetailBuku = async () => {
    try {
      const res = await axios.get(`${baseUrl}/buku/${route.params.id}`);
      setDetailBuku(res.data.data);
    } catch (error) {
      console.log('error:', error.response);
    }
  };

  let status;
  if (detailbuku.stok > 0) {
    status = (
      <Text
        numberOfLines={1}
        style={[styles.status, {backgroundColor: colors.flashGreen}]}>
        tersedia
      </Text>
    );
  } else {
    status = (
      <Text
        numberOfLines={1}
        style={[styles.status, {backgroundColor: colors.background}]}>
        kosong
      </Text>
    );
  }

  const pesanBuku = async () => {
    setVisible(false);
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        const res = await axios.post(`${baseUrl}/anggota/pinjam`, {
          id_anggota: jwtDecode(value).id,
          id_buku: detailbuku.id,
        });
        getDetailBuku();
        setSukses(true);
        setMessage('Buku berhasil dipesan, silahkan ambil ke perpustakaan');
      }
    } catch (error) {
      console.log('error pesan :', error.response.data.msg);
      setSukses(false);
      setMessage(error.response.data.msg);
    } finally {
      setLoading(false);
      setInfo(true);
    }
  };
  useEffect(() => {
    getDetailBuku();
  }, []);

  return (
    <SafeAreaView style={styles.detailContainer}>
      <DialogKonfirmasi
        type="pesan"
        visible={visible}
        batal={() => setVisible(false)}
        ok={pesanBuku}
      />
      <ScrollView contentContainerStyle={styles.detail}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LihatGambar', {
              gambar: detailbuku.foto,
            })
          }
          style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: detailbuku.foto,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.top}>
            <Text style={styles.judul}>{detailbuku.judul}</Text>
            <Text style={styles.kategori}>{detailbuku.kategori}</Text>
            {status}
          </View>
          <View style={styles.mid}>
            <View style={styles.midText}>
              <Text style={styles.textTop}>{detailbuku.jumlah_halaman}</Text>
              <Text style={styles.textBot}>Halaman</Text>
              <Gap height={ms(8)} />
              <Text style={styles.textTop}>{detailbuku.bahasa}</Text>
              <Text style={styles.textBot}>Bahasa</Text>
            </View>
            <View style={styles.midText}>
              <Text style={[styles.textTop, {maxWidth: ms(160)}]}>
                {detailbuku.penerbit}
              </Text>
              <Text style={styles.textBot}>Penerbit</Text>
              <Gap height={ms(8)} />
              <Text style={[styles.textTop, {maxWidth: ms(160)}]}>
                {detailbuku.penulis}
              </Text>
              <Text style={styles.textBot}>Penulis</Text>
            </View>
            <View style={styles.midText}>
              <Text style={styles.textTop}>{detailbuku.stok}</Text>
              <Text style={styles.textBot}>Stok</Text>
              <Gap height={ms(8)} />
              <Text style={styles.textTop}>{detailbuku.tahun_terbit}</Text>
              <Text style={styles.textBot}>Terbit</Text>
            </View>
          </View>
          <View style={styles.bot}>
            <Text style={styles.sinopsis}>Sinopsis</Text>
            <Text style={styles.sinopsisText}>{detailbuku.sinopsis}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <AntDesign name="arrowleft" color={colors.textDark} size={ms(20)} />
      </TouchableOpacity>
      <View style={styles.tombol}>
        <CustomButton
          title="pinjam"
          onPress={() => {
            if (token) {
              if (detailbuku.stok > 0) {
                setVisible(true);
              } else {
                setSukses(false);
                setMessage(
                  'Buku tidak tersedia, silahkan pesan saat buku tersedia',
                );
                setInfo(true);
              }
            } else {
              navigate('Login');
            }
          }}
        />
      </View>
      <LoadingOverlay loading={loading} />
      {info && (
        <Info sukses={sukses} ok={() => setInfo(false)} pesan={message} />
      )}
    </SafeAreaView>
  );
};

export default Detail;

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
    overflow: 'hidden',
    borderBottomColor: colors.background,
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    width: '90%',
    marginTop: ms(-25),
    borderRadius: ms(8),
    overflow: 'hidden',
    paddingBottom: ms(72),
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
  top: {
    elevation: 1,
    borderRadius: ms(8),
    marginBottom: ms(12),
    paddingVertical: ms(8),
    paddingHorizontal: ms(16),
    minHeight: ms(80),
    justifyContent: 'center',
  },
  mid: {
    elevation: 1,
    borderRadius: ms(8),
    marginBottom: ms(12),
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    minHeight: ms(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bot: {
    elevation: 1,
    borderRadius: ms(8),
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    minHeight: ms(120),
  },
  tombol: {
    position: 'absolute',
    width: '100%',
    bottom: ms(24),
    paddingHorizontal: '5%',
  },
  judul: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: ms(14),
  },
  kategori: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: ms(10),
  },
  textTop: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
    fontSize: ms(10),
    textAlign: 'center',
  },
  textBot: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: ms(9),
    textAlign: 'center',
  },
  sinopsis: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(10),
    color: colors.textDark,
  },
  sinopsisText: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(9),
    textAlign: 'justify',
    marginTop: ms(4),
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(8),
    position: 'absolute',
    bottom: ms(8),
    right: ms(8),
    paddingVertical: ms(2),
    paddingHorizontal: ms(8),
    borderRadius: ms(4),
    color: colors.primaryWhite,
  },
});
