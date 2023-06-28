class Plugin {
    //@ts-ignore TODO types
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
//@ts-ignore TODO types
Plugin.$inject = [ 'elementRegistry', 'editorActions', 'canvas', 'modeling' ];


export default {
    __init__: [ 'plugin' ],
    plugin: [ 'type', Plugin ]
};


