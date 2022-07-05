import React from 'react';
import Dialog from 'react-native-dialog';
import {colors} from '../../../res/colors';

const DialogKonfirmasi = ({type, visible, batal, ok}) => {
  let title;
  let deskripsi;
  let tombolOk;
  switch (type) {
    case 'pesan':
      title = 'Pinjam Buku';
      deskripsi =
        'Jika dalam rentan 2 hari buku tidak diambil secara otomatis akan dibatalkan.';
      tombolOk = 'Pesan';
      break;
    case 'keluar':
      title = 'Keluar';
      deskripsi = 'Kamu yakin ingin keluar ?';
      tombolOk = 'Keluar';
      break;
    case 'simpan':
      title = 'Update Profil';
      deskripsi = 'Simpan perubahan data ?';
      tombolOk = 'simpan';
      break;
    default:
      break;
  }
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{deskripsi}</Dialog.Description>
      <Dialog.Button label="Batal" color={colors.gagal} onPress={batal} />
      <Dialog.Button
        label={tombolOk}
        color={colors.primaryTheme}
        onPress={ok}
      />
    </Dialog.Container>
  );
};

export default DialogKonfirmasi;
