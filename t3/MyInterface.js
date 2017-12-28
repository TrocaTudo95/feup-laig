 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    this.scenes = this.gui.addFolder("Scenes");
  	this.scenes.open();
  	this.gui.scene = 'Campo';
  	this.gui.sceneList = this.scenes.add(this.gui, 'scene', ['Campo', 'Casino']);
    this.gui.sceneList.onFinishChange(function(){
      this.removeFolder("Lights",this.gui);
  		this.scene.changeGraph(this.gui.scene + '.xml');
  	}.bind(this))
    // add a group of controls (and open/expand by defult)

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
};

MyInterface.prototype.removeFolder = function(name,parent) {
	if(!parent)
		parent = this.gui;
  var folder = parent.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  parent.__ul.removeChild(folder.domElement.parentNode);
  delete parent.__folders[name];
  parent.onResize();
};