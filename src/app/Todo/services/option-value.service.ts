import {Injectable} from '@angular/core';

@Injectable()
export class OptionValueService {
  private _optionValues: string[] = ["type1", "type2", "type3"];

  get getOptionValues(): string[] {
    return this._optionValues;
  }

}
