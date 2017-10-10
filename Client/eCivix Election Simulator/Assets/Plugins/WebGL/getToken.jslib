mergeInto(LibraryManager.library, {

  getAccessToken: function () {
    
    var token = localStorage.getItem('accessToken');

    if (token === undefined || token === null) {
    	token = "2";
    }

    return token;
  }

});