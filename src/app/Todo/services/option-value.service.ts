import {Injectable} from '@angular/core';

@Injectable()
export class OptionValueService {
  get getOptionValues(): string[] {
    return this._optionValues;
  }
  private _optionValues: string[] = ["type1", "type2", "type3"];

}
