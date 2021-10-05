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
