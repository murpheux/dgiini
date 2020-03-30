import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { UtilService } from './services/util.service';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './models/global-error-handler';
import { LoadingService } from './services/loading.service';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NoHttpCacheInterceptor } from './interceptors/no-http-cache-interceptor';
import { AuthGuard } from './guards/auth-guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { DigitOnlyDirective } from './directives/digit-only/digit-only.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { environment } from 'src/environments/environment';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [LoaderComponent, CommingSoonComponent, ConfirmDialogComponent,
        OverlayLoaderComponent, ContentLoaderComponent, DigitOnlyDirective, GoogleMapComponent],
    exports: [LoaderComponent, CommingSoonComponent, ConfirmDialogComponent,
        OverlayLoaderComponent, ContentLoaderComponent, GoogleMapComponent],
    providers: [
        UtilService,
        LoadingService,
        AuthGuard,
        //  { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NoHttpCacheInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        FontAwesomeModule,
        GoogleMapsModule,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
})
export class SharedModule { }
