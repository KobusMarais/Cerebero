mergeInto(LibraryManager.library, {

  getAccessToken: function () {
    
    var token = localStorage.getItem('accessToken');

    return token;
  }

});