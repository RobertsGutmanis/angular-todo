import {Injectable} from '@angular/core';

@Injectable()
export class OptionValueService {
  optionValues: string[] = ["type1", "type2", "type3"];

  getOptionValues(): string[] {
    return this.optionValues
  }

}
