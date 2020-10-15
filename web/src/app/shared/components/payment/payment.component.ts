import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

    stripe;
    loading = false;
    confirmation;

    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;


    constructor(
        private cd: ChangeDetectorRef,
        private stripeService: AngularStripeService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.stripeService.setPublishableKey(environment.stripe.Publishable_key).then(
            stripe => {
                this.stripe = stripe;
                const elements = stripe.elements();
                this.card = elements.create('card');
                this.card.mount(this.cardInfo.nativeElement);
                this.card.addEventListener('change', this.cardHandler);
            });
    }

    ngOnDestroy(): void {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }

    onChange({ error }): void {
        if (error) {
            this.error = error.message;
        } else {
            this.error = null;
        }
        this.cd.detectChanges();
    }

    async onSubmit(form: NgForm): Promise<void> {
        const { token, error } = await this.stripe.createToken(this.card);

        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Success!', token);
        }
    }

}
