class Plugin {
    //@ts-ignore
  constructor(elementRegistry, editorActions, canvas, modeling) {
    const generateMarkdown = this.generateMarkdown;
    editorActions.register({
        generateDocument: function() {
            generateMarkdown();
        }
    });
    console.log('Plugin constructor');
  }

  generateMarkdown() {
    console.log('generateMarkdown');
  }

}
//@ts-ignore
Plugin.$inject = [ 'elementRegistry', 'editorActions', 'canvas', 'modeling' ];


export default {
    __init__: [ 'plugin' ],
    plugin: [ 'type', Plugin ]
};


