import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../../core/services/configuration.service';
import { PromotionService } from './promotion.service';
import { Promotion } from './promotion';

@Component({
    selector: 'promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
    loader: Subscription;
    promotions: Promotion[];
    multipleMerchants: boolean = false;
    
    constructor(public s: ConfigurationService, service: PromotionService) {
        this.loader = service
            .getAll()
            .subscribe(
                promotions => {
                    this.promotions = promotions;
                    for (var i = 0; this.promotions.length > 1 && i < this.promotions.length - 1; i++) {
                        if (this.promotions[i].merchantName != this.promotions[i + 1].merchantName) {
                            this.multipleMerchants = true;
                            break;
                        }
                    }
                },
                err => console.log(err)
            );
    }

    getTitlesColor(index:number): string {
        if (index % 2 == 0) {
            return this.s.config.design ? this.s.config.design.titlesColor : null;
        }
        return '#fff';
    }

    getColor(index:number, even: boolean = false): string {
        var r = even === true ? 1 : 0;
        if (index % 2 == r) {
            return this.s.config.design ? this.s.config.design.buttonsColor : '#fdbc00';
        }
        return '#fff';
    }

    getBorderColor(reverse: boolean = false): string {
        var color = this.s.config.design ? this.s.config.design.buttonsColor : null;
        if (reverse) {
            return color + ' white transparent transparent';
        }
        return 'white ' + color + ' transparent transparent';
    }
}
