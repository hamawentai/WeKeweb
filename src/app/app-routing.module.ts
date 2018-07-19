import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from './onlineExam/testExam/test/test.component';
import {DetailsComponent} from './onlineExam/examDetails/details/details.component';
import {RankComponent} from './onlineExam/ExamRank/rank/rank.component';
import {ExamAnalysisComponent} from './onlineExam/ExamAnalysis/exam-analysis/exam-analysis.component';
import {ReportComponent} from './onlineExam/ExamAnalysis/EvaluationReport/report/report.component';
import {AnalysisComponent} from './onlineExam/ExamAnalysis/AnswerAnalysis/analysis/analysis.component';
import {ProblemComponent} from "./onlineExam/problem/problem.component";
import {PublisProblemComponent} from "./onlineExam/publis-problem/publis-problem.component";
import {LoginComponent} from "./onlineExam/login/login.component";

const routes: Routes = [
  { path: 'test' , component: TestComponent } ,
  { path: 'details', component: DetailsComponent} ,
  { path: 'rank' , component: RankComponent},
  {path: 'analysis', component: ExamAnalysisComponent, children: [
      {path: '', component: ReportComponent} ,
      {path: 'examAnalysis', component: AnalysisComponent}
    ]},
  {path: 'problem' , component: ProblemComponent},
  {path: 'publicProblem' , component:PublisProblemComponent},
  {path: 'login' , component: LoginComponent}
  // { path: 'exam/:id' , component: TestComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
