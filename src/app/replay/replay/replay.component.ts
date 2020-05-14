import {Component, OnInit} from '@angular/core';
import {ReplyService} from "../service/reply.service";
import {Reply} from "../domain/reply";
import {Po} from "../domain/po";
import {ActivatedRoute} from "@angular/router";
import {DateService} from "../../allDate/date.service";

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {

  conf: any = {
    extraPlugins: `clipboard,lineutils,lineheight,widget,dialog,codesnippet`,
    codeSnippet_theme: 'monokai_sublime',
    filebrowserImageUploadUrl: ''
  };

  content: string = "";
  userName: string = localStorage.getItem('userName');
  nickname: string;
  myPhotoUrl: string = localStorage.getItem('photoUrl');
  index: string = '-1';
  inputMsg: string;
  commentId: string;
  flag: string;
  reply: Reply;
  replyId: string;

  constructor(private replyService: ReplyService,
              private activeRoute: ActivatedRoute,
              public dateService: DateService) {
  }

  // 获得路由参数
  getParams(index: string): string {
    return this.activeRoute.snapshot.queryParams[index];
  }

  // 1 直接回复 2 回复回复者
  replyAB(index: string, kind: string, nickname: string, replyId: string): void {
    this.nickname = nickname;
    this.flag = kind;
    this.index = index;
    // this.inputMsg = nickname;
    this.replyId = replyId;
    console.log(index + "  " + kind + "  " + nickname);
  }

  // 直接回复题主
  replyMaster(nickname: string) {
    if (this.content.length === 0) {
      return;
    }
    this.nickname = nickname;
    console.log("content "+this.content);
    this.replyService.saveReply(new Po("1", this.commentId, this.userName, this.content,this.nickname)).subscribe(result =>{
      this.getReply();
    });
    this.content = '';
  }

  // 小框回复
  selectReply(flag: string) {
    this.index = '-1';
    if (this.flag === '1'&& this.inputMsg.length != 0) {
      this.replyService.saveReply(new Po("2",this.replyId, this.userName, this.inputMsg,this.nickname)).subscribe(result =>{
        this.getReply();
      });
      this.inputMsg = '';
    }
  }

  change(event): void {

  }

  getReply(): void {
    this.replyService.getReplys(this.commentId).subscribe(result => {
      this.reply = result;
    });
  }

  ngOnInit() {
    this.commentId = this.getParams("commentId");
    console.log(this.commentId);
    this.getReply();
    // this.userName = localStorage.getItem("userName");
  }

}
