import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

/**
 * 消息服务
 */
@Injectable()
export class MessageService {

    /**
     * 构造器
     */
    constructor(private http:Http) {
    }

    /**
     * 获取未读消息数量
     * @return 未读消息数量
     */
    getUnreadMessageCount():Promise<number> {
        return new Promise<number>(resolve=> {
            let url = '/tec_oa/page/main/getInformation.do';
            this.http.get(url).subscribe(res=> {
                console.debug("Message: unread message count [" + res.json()[1].rowCount + "]");
                resolve(res.json()[1].rowCount);
            })
        });
    }

}