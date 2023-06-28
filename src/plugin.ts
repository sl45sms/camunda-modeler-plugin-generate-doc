class Plugin {
    //@ts-ignore TODO types
  constructor(elementRegistry, editorActions, canvas, modeling) {
    const generateMarkdown = this.generateMarkdown;
    editorActions.register({
        generateDocument: function() {
            generateMarkdown(elementRegistry);
        }
    });
    console.log('Plugin constructor');
  }

  generateMarkdown(elementRegistry:any) {
    
    console.log('generateMarkdown');
    console.log(elementRegistry);
    /*
    Prota vrisko to CollaborationObject*/
    const collaborationObject = elementRegistry.filter(function(element:any) {
        return element.type === 'bpmn:Collaboration';
    }
    )[0];
    console.log(collaborationObject);
    /* Vrisko to process */
    const process = elementRegistry.filter(function(element:any) {
        return element.type === 'bpmn:Process';
    }
    )[0];
    console.log(process);

    /* fenete na yparxei eite Process eite CollaborationObject */
    if (process || collaborationObject) {
        /* generate table of contents by geting all childs of process or CollaborationObject */
        /* the child have businessObject.name */
        const childrens = process ? process.children : collaborationObject.children;
        
       
        console.log("CHILDS",childrens);
        //walk recursively the childrens
        const walk = (childrens:any) => {

            let markdown = '';
            childrens.forEach((child:any) => {
                const id = child.businessObject.id;
                const name = child.businessObject.name || id;
                const type = child.type;
                /* if type is bpmn:Process or bpmn:Collaboration then add # */
                switch (type) {
                    case 'bpmn:Process':
                    case 'bpmn:Collaboration':
                      markdown += `# [${name}]\n`;
                      break;
                    case 'bpmn:Task':
                    case 'bpmn:SubProcess':
                    case 'bpmn:StartEvent':
                    case 'bpmn:EndEvent':
                    case 'bpmn:ExclusiveGateway':
                    case 'bpmn:ParallelGateway':
                    case 'bpmn:InclusiveGateway':
                    case 'bpmn:ComplexGateway':
                    case 'bpmn:EventBasedGateway':
                    case 'bpmn:IntermediateCatchEvent':
                    case 'bpmn:IntermediateThrowEvent':
                    case 'bpmn:BoundaryEvent':
                    case 'bpmn:DataObjectReference':
                    case 'bpmn:DataStoreReference':
                    case 'bpmn:CallActivity':
                    case 'bpmn:TextAnnotation':
                    case 'bpmn:Group':
                      markdown += `### [${name}]\n`;
                      break;
                    default:
                      markdown += `## [${name}]\n`;
                      break;
                  }

               
                markdown += `* (${id})\n`;

                const documentationArray = child.businessObject.documentation || [];
                if (documentationArray.length > 0) {
                    markdown += documentationArray[0].text || '';
                }
                if (child.children)
                markdown += walk(child.children);

            });
            return markdown+'\n';
        }
        const markdown = walk(childrens);
        console.log("THE MARKDOWN",markdown);
        
    }

  }

}
//@ts-ignore TODO types
Plugin.$inject = [ 'elementRegistry', 'editorActions', 'canvas', 'modeling' ];


export default {
    __init__: [ 'plugin' ],
    plugin: [ 'type', Plugin ]
};


