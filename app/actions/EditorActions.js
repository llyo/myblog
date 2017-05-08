import alt from '../alt';

class EditorActions {
  constructor() {
    this.generateActions(
      'editorSuccess',
      'editorFail',
      'updateCategory',
      'updateState',
      'updateTitle',
      'updateTag',
      'updateAbstract',
      'setDisabled',
      'setDefault',
      'checkValue'
    );
  }

  saveArticle(param) {
    this.actions.setDisabled(true);
    $.ajax({
      type: 'POST',
      url: '/api/saveArticle',
      data: param
    }).done((data) => {
      // this.actions.addCharacterSuccess(data.message);
      toastr.success(data.message);
      this.actions.setDefault();
    }).fail((jqXhr) => {
      toastr.error(jqXhr.responseJSON.message);
      // this.actions.addCharacterFail(jqXhr.responseJSON.message);
    }).complete(() => {
      this.actions.setDisabled(false);
    });
  }
}

export default alt.createActions(EditorActions);