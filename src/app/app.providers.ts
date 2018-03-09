import { HttpService } from './core/services/http.service';
import { AuthHttpService } from './core/services/auth-http.service';
import { ConfigurationService } from './core/services/configuration.service';
import { UserService } from './core/services/user.service';
import { LocalForageService } from './core/services/local-forage.service';
import { AuthService } from './components/+auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PromotionService } from './components/promotion/promotion.service';
import { ReviewService } from './components/review/review.service';
import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { APP_CONFIG, appConfigFactory } from './app.config';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    resistanceRatio: 0,
    keyboard: true
};

export const APP_PROVIDERS = [
    HttpService,
    AuthHttpService,
    AuthService,
    AuthGuard,
    ConfigurationService,
    UserService,
    LocalForageService,
    PromotionService,
    ReviewService,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG },
    { provide: APP_CONFIG, useFactory: appConfigFactory }
];