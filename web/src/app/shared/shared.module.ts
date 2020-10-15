import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DigitOnlyDirective } from './directives/digit-only/digit-only.directive';
import { NgLetDirective } from './directives/ng-let/ng-let.directive';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NoHttpCacheInterceptor } from './interceptors/no-http-cache-interceptor';
import { LoadingService } from './services/loading.service';
import { UtilService } from './services/util.service';


@NgModule({
    declarations: [
        LoaderComponent,
        CommingSoonComponent,
        ConfirmDialogComponent,
        OverlayLoaderComponent,
        ContentLoaderComponent,
        DigitOnlyDirective,
        GoogleMapComponent,
        NgLetDirective,
        PaymentComponent,
    ],
    exports: [
        LoaderComponent,
        CommingSoonComponent,
        ConfirmDialogComponent,
        OverlayLoaderComponent,
        ContentLoaderComponent,
        GoogleMapComponent,
    ],
    providers: [
        UtilService,
        LoadingService,
        AuthGuard,
        // { provide: ErrorHandler, useClass: GlobalErrorHandler },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ServerErrorInterceptor,
        //     multi: true,
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoHttpCacheInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        FontAwesomeModule,
        GoogleMapsModule,
        GalleryModule,
        LightboxModule,
    ],
    entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
