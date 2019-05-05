import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProDocService } from '../../services/pro-doc.service';
import { ProjectLegalModel } from '../../models/project-legal-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-legal-frameworks',
  templateUrl: './legal-frameworks.component.html',
  styleUrls: ['./legal-frameworks.component.scss']
})
export class LegalFrameworksComponent implements OnInit {

  projectLegal: ProjectLegalModel;
  annexNumber: string;
  applicableAgreement: string;
  responseMessage: string;

  projectCode: string;
  constructor(private route: ActivatedRoute, private prodocService: ProDocService, private toastr: ToastrService) {

    this.route.params.subscribe(params => {
      this.projectCode  = params['code'];
    });
  }

  ngOnInit() {
    this.prodocService.getLegalByCode(this.projectCode).subscribe((result: any) => {

      if(result.data) {
       const tmpProjectLegal: ProjectLegalModel = <ProjectLegalModel>result.data ;
       this.annexNumber = tmpProjectLegal.annexNumber;
       this.applicableAgreement = tmpProjectLegal.applicableAgreement;
       this.projectLegal = tmpProjectLegal;
      } else {
        this.projectLegal = new ProjectLegalModel();
        this.projectLegal.projectCode = this.projectCode;
      }
  });
}
save() {

  this.projectLegal.annexNumber = this.annexNumber;
  this.projectLegal.applicableAgreement = this.applicableAgreement;

  if (!this.projectLegal.id) {
    this.prodocService.createLegal(this.projectLegal).subscribe((result: any) => {
      if ( result.data ) {
        this.projectLegal = <ProjectLegalModel>result.data ;
        this.toastr.success( 'legal framework has been created ', 'created');
      } else {
        this.responseMessage = 'failed to create this legal framework ' + result.errorMessage;
      }
    });

  } else {
    this.prodocService.updateLegal(this.projectLegal, this.projectLegal.id).subscribe((result: any) => {
      if ( result.data ) {
        this.toastr.success( 'legal framework has been updated ', 'updated');
      } else {
        this.responseMessage = 'failed to update this legal framework ' + result.errorMessage;
      }
    });
}

}
handleCancel() {
  this.annexNumber = null ;
  this.applicableAgreement = null;
}

}
