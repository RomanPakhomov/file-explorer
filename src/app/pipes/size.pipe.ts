import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {
  private decimalPipe: DecimalPipe;

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.decimalPipe = new DecimalPipe(locale);
  }

  public transform(sizeInBytes: number): string {
    // no value
    if (sizeInBytes == null) {
      return '-';
    }

    // zero
    if (sizeInBytes === 0) {
      return '0 KB';
    }

    // <10 KiB
    if (sizeInBytes < 10) {
      return this.decimalPipe.transform(sizeInBytes, '1.2-2') + ' KB';
    }

    // <100 KiB
    if (sizeInBytes < 100) {
      return this.decimalPipe.transform(sizeInBytes, '1.1-1') + ' KB';
    }

    // <1000 KiB
    if (sizeInBytes < 1000) {
      return this.decimalPipe.transform(sizeInBytes, '1.0-0') + ' KB';
    }

    // <10 MiB
    if (sizeInBytes < 10 * 1024) {
      return this.decimalPipe.transform(sizeInBytes / 1024, '1.2-2') + ' MB';
    }

    // <100 MiB
    if (sizeInBytes < 100 * 1024) {
      return this.decimalPipe.transform(sizeInBytes / 1024, '1.1-1') + ' MB';
    }

    // <1000 MiB
    if (sizeInBytes < 1000 * 1024) {
      return this.decimalPipe.transform(sizeInBytes / 1024, '1.0-0') + ' MB';
    }

    // <100 GiB
    if (sizeInBytes < 10 * 1024 * 1024) {
      return this.decimalPipe.transform(sizeInBytes / 1024 / 1024, '1.2-2') + ' GB';
    }

    // <1000 GiB
    if (sizeInBytes < 1000 * 1024 * 1024) {
      return this.decimalPipe.transform(sizeInBytes / 1024 / 1024, '1.1-1') + ' GB';
    }

    // TiB
    return this.decimalPipe.transform(sizeInBytes / 1024 / 1024 / 1024, '1.2-2') + ' TB';

  }
}
