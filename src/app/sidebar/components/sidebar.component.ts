import {Component, OnInit, Input} from "angular2/core";
import {User} from "../../user/entities/user";
import {Router} from "angular2/router";
/**
 * Created by ChihoSin.
 */
@Component({
    selector: 'mobi-oa-sidebar',
    templateUrl: 'app/sidebar/templates/sidebar.html'
})
export class SidebarComponent implements OnInit {

    @Input() currentUser:User;

    /**
     * 构造器
     */
    constructor(private router:Router) {
    }

    /**
     * 初始化
     */
    ngOnInit() {
        this.initMenu();
    }

    /**
     * 初始化菜单
     */
    initMenu() {
        // Toggle Left Menu
        jQuery('.menu-list > a').click(function () {

            var parent = jQuery(this).parent();
            var sub = parent.find('> ul');

            if (!jQuery('body').hasClass('left-side-collapsed')) {
                if (sub.is(':visible')) {
                    sub.slideUp(200, function () {
                        parent.removeClass('nav-active');
                        jQuery('.main-content').css({height: ''});
                        var docHeight = jQuery(document).height();
                        if (docHeight > jQuery('.main-content').height())
                            jQuery('.main-content').height(docHeight);
                    });
                } else {
                    jQuery('.menu-list').each(function () {
                        var t = jQuery(this);
                        if (t.hasClass('nav-active')) {
                            t.find('> ul').slideUp(200, function () {
                                t.removeClass('nav-active');
                            });
                        }
                    });
                    parent.addClass('nav-active');
                    sub.slideDown(200, function () {
                        var docHeight = jQuery(document).height();
                        if (docHeight > jQuery('.main-content').height())
                            jQuery('.main-content').height(docHeight);
                    });
                }
            }
            return false;
        });

        // Menu Toggle
        jQuery('.toggle-btn').click(function () {
            var body = jQuery('body');
            var bodyposition = body.css('position');

            if (bodyposition != 'relative') {

                if (!body.hasClass('left-side-collapsed')) {
                    body.addClass('left-side-collapsed');
                    jQuery('.custom-nav ul').attr('style', '');

                    jQuery(this).addClass('menu-collapsed');

                } else {
                    body.removeClass('left-side-collapsed chat-view');
                    jQuery('.custom-nav li.active ul').css({display: 'block'});

                    jQuery(this).removeClass('menu-collapsed');

                }
            } else {

                if (body.hasClass('left-side-show'))
                    body.removeClass('left-side-show');
                else
                    body.addClass('left-side-show');

                var docHeight = jQuery(document).height();
                if (docHeight > jQuery('.main-content').height())
                    jQuery('.main-content').height(docHeight);
            }

        });

        // Window Resize
        jQuery(window).resize(function () {

            if (jQuery('body').css('position') == 'relative') {

                jQuery('body').removeClass('left-side-collapsed');

            } else {

                jQuery('body').css({left: '', marginRight: ''});
            }

        });
    }

    /**
     * 导航到路径
     * @param url 路径
     */
    navTo(url:string) {
        console.debug("Sidebar: navigate to [" + url + "]");
        this.router.navigateByUrl(url).then(()=> {
            var parent = jQuery('.menu-list > a').parent();
            var sub = parent.find('> ul');

            sub.slideUp(200, function () {
                parent.removeClass('nav-active');
                jQuery('.main-content').css({height: ''});
                var docHeight = jQuery(document).height();
                if (docHeight > jQuery('.main-content').height())
                    jQuery('.main-content').height(docHeight);
            });
            var body = jQuery('body');
            if (body.hasClass('left-side-show'))
                body.removeClass('left-side-show');
            else
                body.addClass('left-side-show');

            var docHeight = jQuery(document).height();
            if (docHeight > jQuery('.main-content').height())
                jQuery('.main-content').height(docHeight);
        });
    }
}