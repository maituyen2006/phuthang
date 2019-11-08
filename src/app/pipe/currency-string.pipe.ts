import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyString'
})
export class CurrencyStringPipe implements PipeTransform {
  ChuSo = new Array(' không ', ' một ', ' hai ', ' ba ', ' bốn ', ' năm ', ' sáu ', ' bảy ', ' tám ', ' chín ');
  Tien = new Array('', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ');
  transform(value: number): string {
    return this.DocTienBangChu(value);
  }
  private DocSo3ChuSo(baso: number) {
    let tram: number;
    let chuc;
    let donvi;
    let KetQua = '';
    tram = Math.floor(baso / 100);
    chuc = Math.floor((baso % 100) / 10);
    donvi = Math.floor(baso % 10);
    if (tram === 0 && chuc === 0 && donvi === 0) {
      return '';
    }
    if (tram !== 0) {
      KetQua += this.ChuSo[tram] + ' trăm ';
      if ((chuc === 0) && (donvi !== 0)) {
        KetQua += ' linh ';
      }
    }
    if ((chuc !== 0) && (chuc !== 1)) {
      KetQua += this.ChuSo[chuc] + ' mươi';
      if ((chuc === 0) && (donvi !== 0)) {
        KetQua = KetQua + ' linh ';
      }
    }
    if (chuc === 1) {
      KetQua += ' mười ';
    }
    switch (donvi) {
      case 1:
        if ((chuc !== 0) && (chuc !== 1)) {
          KetQua += ' mốt ';
        } else {
          KetQua += this.ChuSo[donvi];
        }
        break;
      case 5:
        if (chuc === 0) {
          KetQua += this.ChuSo[donvi];
        } else {
          KetQua += ' lăm ';
        }
        break;
      default:
        if (donvi !== 0) {
          KetQua += this.ChuSo[donvi];
        }
        break;
    }
    return KetQua;
  }

  private DocTienBangChu(SoTien) {
    let lan = 0;
    let i = 0;
    let so = 0;
    let KetQua = '';
    let tmp = '';
    const ViTri = new Array();
    // if (SoTien < 0) {
    //   return 'Số tiền âm !';
    // }
    if (SoTien === 0) {
      return 'Không';
    }
    if (SoTien > 0) {
      so = SoTien;
    } else {
      so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
      return 'Số quá lớn!';
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5])) {
      ViTri[5] = '0';
    }
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4])) {
      ViTri[4] = '0';
    }
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3])) {
      ViTri[3] = '0';
    }
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = Math.floor(so / 1000000);
    if (isNaN(ViTri[2])) {
      ViTri[2] = '0';
    }
    ViTri[1] = Math.floor((so % 1000000) / 1000);
    if (isNaN(ViTri[1])) {
      ViTri[1] = '0';
    }
    ViTri[0] = Math.floor(so % 1000);
    if (isNaN(ViTri[0])) {
      ViTri[0] = '0';
    }
    if (ViTri[5] > 0) {
      lan = 5;
    } else if (ViTri[4] > 0) {
      lan = 4;
    } else if (ViTri[3] > 0) {
      lan = 3;
    } else if (ViTri[2] > 0) {
      lan = 2;
    } else if (ViTri[1] > 0) {
      lan = 1;
    } else {
      lan = 0;
    }
    for (i = lan; i >= 0; i--) {
      tmp = this.DocSo3ChuSo(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) {
        KetQua += this.Tien[i];
      }
      // if ((i > 0) && (tmp.length > 0)) {
      //   // && (!string.IsNullOrEmpty(tmp))
      //   KetQua += ',';
      // }
    }
    if (KetQua.substring(KetQua.length - 1) === ',') {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    return KetQua + ' đồng';
    // .substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }

}
