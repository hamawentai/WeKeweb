import { Component, OnInit } from '@angular/core';
import {EmitService} from "../../route/emit.service";
import {LoginService} from "./service/login.service";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import {Photourl} from "../../user/domian/photourl";
import {UserPhoto} from "./domain/UserPhoto";
import {DateService} from "../../allDate/date.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public emitService: EmitService,
              private loginService: LoginService,
              private dateService: DateService,
              private message: NzMessageService) { }

  ngOnInit() {
    // 接收发射过来的数据
    this.emitService.eventEmit.subscribe((value: any) => {
      console.log("denglu" + value);
      if(value === "login") {
        this.isVisible = true;
        // 这里就可以调取接口，刷新userList列表数据
        this.choiceFlag = 1;
      }
      if (value === 'register') {
        this.isVisible = true;
        this.choiceFlag = 2;
      }
    });
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //记住密码
  checked = true;
  setCheck() {
    this.checked = false;
  }

  //同意
  agree = true;
  setAgree() {
    this.agree = false;
  }

  // 登录注册
  choiceFlag = 1;
  setLogin() {
    this.registerName='';
    this.registerPassword='';
    this.registerResult='';
    this.choiceFlag = 1;
  }
  setRegsiter() {
    this.loginName='';
    this.loginPassword='';
    this.loginResult='';
    this.choiceFlag = 2;
  }

  // 注册信息
  registerName = "";
  registerPassword = "";
  registerResult='';

  registerClick() {

    this.loginService.registerUser(this.registerName,this.registerPassword,this.phoneNumber,this.sendCode).subscribe(
      result => {
          if (result.toString() === "true") {
            this.message.create('success', '注册成功');
            this.registerResult = 'true';
            this.choiceFlag = 1;
          } else {
            this.message.create('error', '注册失败');
          }
        this.registerName = '';
        this.registerPassword = '';
        this.phoneNumber = '';
        this.sendCode = '';
        }
    );
  }

  //登录信息
  loginName = "";
  loginPassword = "";
  loginResult = '';

  loginClick() {
    this.loginService.loginUser(this.loginName, this.loginPassword).subscribe(
      res =>{
        console.log("wokao"+res);
        if (res) {
          this.isVisible = false;
          this.loginService.loginFlag = 'true';
          localStorage.setItem("token",res.body);
          localStorage.setItem("userName",this.loginName);
          this.message.create('success', '登录成功');
          this.loginService.setUserInfo(this.loginName).subscribe();
          this.loginService.getUserPhoto(this.loginName).subscribe(
            res => {
              if (res) {
                this.dateService.photoUrl = (res as UserPhoto).photoUrl;
                localStorage.setItem("photoUrl", (res as UserPhoto).photoUrl);
              }
            }
          );
        }
      },
      error => {
        this.message.create('error', '用户名或密码错误');
        this.loginPassword = '';
        this.loginName = '';
      }
    );
  }

  phoneNumber = '';
  sendCode = '';
  createCode() {
    this.loginService.sendCode(parseInt(this.phoneNumber)).subscribe(
      res => {
        if (res.toString() === 'true' ) {
          this.message.create('success', '验证码发送成功');
        } else {
          this.message.create('error', '验证码发送失败');
        }
      }
    );
  }

  num =0;

  private timer;

  githubLogin() {
   this.timer = setInterval(() => {
      this.num++;

      if (this.num % 3 == 0) {
        this.loginService.githubLogin().subscribe(
          res => {
            if (res.username) {
              console.log("用户信息"+res.username);
              console.log("头像"+res.password);
              console.log("token"+res.phone);
              // clearInterval();
              clearInterval(this.timer);
              this.isVisible = false;
              this.loginService.loginFlag = 'true';
              localStorage.setItem("token",res.phone);
              localStorage.setItem("userName",res.username);
              this.message.create('success', '登录成功');
            }
          }
        );
      }
    },1000);
  }
}
