﻿import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';

import { ReviewComponent } from './review.component';
import { NewReviewDialogComponent } from './new-review/new-review.component';
import { routes } from './review.routes';

@NgModule({
    imports: [
        SharedModule,
        StarRatingModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ReviewComponent,
        NewReviewDialogComponent
    ]
})
export class ReviewModule { }