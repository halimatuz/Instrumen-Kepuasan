import { Component, OnInit } from '@angular/core';
import { PertanyaanService } from '../../services/pertanyaan/pertanyaan.service';
import { Pertanyaan } from '../../services/pertanyaan/pertanyaan.model';
import { DetailsService } from '../../services/details/details.service';
import { Details } from '../../services/details/details.model';
import { FakultasService } from '../../services/fakultas/fakultas.service';
import { Fakultas } from '../../services/fakultas/fakultas.model';
import { ProdiService } from '../../services/prodi/prodi.service';
import { Prodi } from '../../services/prodi/prodi.model';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormControlDirective } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { AnswerService } from '../../services/answer/answer.service';    // CRUD services API
import { Answer } from '../../services/answer/answer.model';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    sub;
    id;
    user;
    quest : Pertanyaan[];
    detail : Details[];
    fakul : Fakultas[];
    prod : Prodi[];
    public QForm: FormGroup; 
    programList: Array<any>;
    
    public obtained;
    constructor(private pertanyaanService : PertanyaanService,
              private _Activatedroute:ActivatedRoute,
               private _router:Router,
               private detailsService : DetailsService,
               private fakultasService : FakultasService,
               private prodiService : ProdiService,
               private spinner: NgxSpinnerService,
              public crud : AnswerService,
              public fb: FormBuilder,       
              public toastr: ToastrService  ) { 
      this.Q_Form();
      
    }
    Q_Form() {
      
      this.QForm = this.fb.group({
        nama: ['', [Validators.required]],
        fakultas: ['', [Validators.required]],
        prodi: ['', [Validators.required]],
        radio : ['']

      }) 
    }
    
    ngOnInit() {
        this.sub=this._Activatedroute.paramMap.subscribe(params => { 
            this.user=params.get('user');
            this.id = params.get('id'); 
            //Read Pertanyaan
            this.pertanyaanService.getPolicies().subscribe(data => {
                this.quest = data.map(e => {
                  return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data() as Pertanyaan 
                
                };
                })
                this.obtained=Array();
                for (var x=0; x<this.quest.length;x++){
                  
                  this.obtained[x]="x";
                
                }
              });
            //Read Detail
            this.detailsService.getPolicies().subscribe(data => {
                this.detail = data.map(e => {
                  return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data() as Details 
                
                };
                })
              });
              //Read Fakultas
              this.fakultasService.getPolicies().subscribe(data => {
                this.fakul = data.map(e => {
                  return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data() as Fakultas 
                
                };
                })
               
                //Read Prodi
                  this.prodiService.getPolicies().subscribe(data => {
                    this.prod = data.map(e => {
                      return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data() as Prodi 
                    
                    };
                    })
                   
                    this.programList=[]
                    for(var x=0; x<this.fakul.length; x++){
                      var arrP =[];
                      var arrId = [];
                      for(var y=0; y<this.prod.length; y++){

                        if(this.prod[y]['fakultas']==this.fakul[x]['id_fakultas']){
                          arrP.push(this.prod[y]['nama_prodi'])
                          arrId.push(this.prod[y]['id_prodi'])
                        }
                        

                      }
                      this.programList.push({
                          faculty : this.fakul[x]['nama_fakultas'],
                          idF : this.fakul[x]['id_fakultas'],
                          prodi : arrP,
                          idP : arrId
                      })
                    }
                    
                  });

              });

              

            });
    
    }
    submitQData() {
      let   x ={} as Answer;
      let dateTime = new Date()
      
      x['fakultas']= this.QForm.get('fakultas').value;
      x['kriteria']=this.id;
      x['user']=this.user;
      x['nama']=this.QForm.get('nama').value;
      x['prodi']=this.QForm.get('prodi').value;
      x['answer']=this.obtained;
      x['created_at']=dateTime.toLocaleString();
      console.log(x)
      
      /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
      this.crud.createPolicy(x);
      this.toastr.success(' successfully added!'); // Show success message when data is successfully submited
      
     
      
      window.setTimeout(function () {
        location.href = "/";
    }, 5000);
     }
  cities: Array<any>;
  isProd: Array<any>;
  changeCountry(count) {
    
    this.cities= this.programList.find(con => con.idF == count).prodi;
    this.isProd= this.programList.find(con => con.idF == count).idP;
  }

}
