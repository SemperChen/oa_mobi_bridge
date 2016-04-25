import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Pager} from "../../common/entities/pager";
import {WorkflowTopic} from "../entities/workflow-topic";
import {WorkflowDetailBorrowApply} from "../entities/workflow-detail-borrowapply";

@Injectable()
export class WorkflowService {

    /**
     * 构造器
     */
    constructor(private http:Http) {
    }

    /**
     * 获取表单详细数据
     */
    getWorkflowDetail(taskId:string):Promise<any> {
        return new Promise<any>(resolve=> {
            let url = '/tec_oa/formpro_processPage.do?paramFlowType=DOC&paramProduceName=Process&isapproval=isapproval&paramExecTaskID=';
            this.http.get(url + taskId).subscribe(res=> {
                var json = this.convertJspData(res.text());
                switch (json[0].tablename) {
                    case 'OA_DYNAMIC_FINMM_BORROWAPPLY':
                        var result:WorkflowDetailBorrowApply = json[0].fields[0];
                        result.tableType = json[0].tablename;
                        result.tableName = "借支申请单";
                        resolve(result);
                        break;
                    default:
                        resolve(null);
                }
            })
        });
    }

    /**
     * 获取审批列表
     */
    getWorkflowList():Promise<Pager<WorkflowTopic>> {
        return new Promise<Pager<WorkflowTopic>>(resolve=> {
            let url = '/tec_oa/page/flow/getMonitorItemList.do?monitorItemSearch.processState=t1.last_update_date';
            this.http.get(url).subscribe(res=> {

                var pager:Pager<WorkflowTopic>;
                var list:WorkflowTopic[];

                pager = res.json()[0];
                list = res.json()[1];

                pager.list = list;

                if (pager.rowCount != 0 && pager.rowCount) {
                    resolve(pager);
                } else {
                    return null;
                }
            })
        });
    }

    /**
     * 抓取 JSP 页面 JSON
     * @param data JSP 数据
     * @returns JsonData 对象
     */
    private convertJspData(data:string):any {
        var result = data.split("jsonData=");
        var json = result[1].split(";if(document.all(", 1);
        json = json.toString().split(";var pbussSelect", 1);
        return eval("(" + json + ")");
    }

}