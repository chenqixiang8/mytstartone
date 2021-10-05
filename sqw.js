        var url;
        var lang = (navigator.appName=='Netscape'?navigator.language:navigator.userLanguage).toLowerCase();
        switch(lang){
                case 'en':
                        url = 'https://mytstartone.com/en/';
                        break;
                case 'en-us':
                        url = 'https://mytstartone.com/en/';
                        break;
                case 'zh-cn':
                        url = 'https://mytstartone.com/';
                        break;
                case 'zh-tw':
                        url = 'https://mytstartone.com/';
                        break;
                case 'zh-hk':
                        url = 'https://mytstartone.com/';
                        break;
                case 'es-ar':
                        url = 'https://mytstartone.com/en';
                        break;
                case 'es':
                        url = 'https://mytstartone.com/en';
                        break;
                default:
                        url = 'https://mytstartone.com/';
        }
        if( location.href != url ){
                        location.href = url;
        }



$(document).ready(function() {
    $(document).foundation();
})



function isMobile() {
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)))
return true;
else
return false;
}
var urlMobile='https://m.mytstartone.cf/';//手机跳转的页面
if(isMobile() !== false)
window.location.href=urlMobile;



        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?30f3fe19fb775bcc847aa13a5a0daae1";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })(); 
