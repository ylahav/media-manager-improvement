/**
* @version		$Id$
* @package		Joomla
* @copyright	Copyright (C) 2005 - 2007 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

/**
 * JImageManager behavior for media component
 *
 * @author		Johan Janssens <johan.janssens@joomla.org>
 * @package		Joomla.Extensions
 * @subpackage	Media
 * @since		1.5
 */
var JImageManager = new Class({
	initialize: function(popup)
	{
		this.popup			= $(popup);
		this.imageview  	= $('imageview');
		this.upbutton	  	= $('upbutton');
		this.folderlist 	= $('folderlist');
		this.uploadtoggler  = $('uploadtoggler');

		//Setup events
		this.imageview.manager = this;
		this.imageview.addEvent('load', function(){ this.manager.onloadimageview(); });

		this.upbutton.manager = this;
		this.upbutton.addEvent('click', function(){ this.manager.upFolder(); });

		this.uploadtoggler.manager = this;
		this.uploadtoggler.addEvent('click', function(){
			if(this.hasClass('toggler-down')) {
				this.removeClass('toggler-down');
				this.manager.popup.decreaseHeight(50);
			} else {
				this.addClass('toggler-down');
				this.manager.popup.increaseHeight(50);
			}
			this.manager.uploadpane.toggle();
		});

		//Setup effect
		this.uploadpane = new Fx.Slide($('uploadpane'), {opacity:true, duration: 200});
		this.uploadpane.hide();
	},

	onloadimageview: function()
	{
		var folder = this.getImageFolder();
		this.setFolder(folder, true);
	},

	getImageFolder: function()
	{
		var url 	= this.imageview.location.search.substring(1);
		var args	= this.parseQuery(url);

		return args['folder'];
	},

	onok: function()
	{
		// Get the image tag field information
		var url		= $("f_url").getValue();
		var alt		= $("f_alt").getValue();
		var align	= $("f_align").getValue();
		var title	= $("f_title").getValue();
		var caption	= $("f_caption").getValue();

		if (url != '') {
			// Set alt attribute
			if (alt != '') {
				alt = "alt=\""+alt+"\" ";
			}
			// Set align attribute
			if (align != '') {
				align = "align=\""+align+"\" ";
			}
			// Set align attribute
			if (title != '') {
				title = "title=\""+title+"\" ";
			}
			// Set align attribute
			if (caption != '') {
				caption = 'class="caption"';
			}

			var tag = "<img src=\""+url+"\" "+alt+align+title+caption+" />";
		}

		window.parent.jInsertEditorText(tag);
		return false;
	},

	setFolder: function(directory, refresh)
	{
		//this.showMessage('Loading');

		for(var i = 0; i < this.folderlist.length; i++)
		{
			var folder = this.folderlist.options[i].text;
			if(folder == directory) {
				this.folderlist.selectedIndex = i;
				break;
			}
		}

		this.imageview.src   = 'index.php?option=com_media&task=imgManagerList&tmpl=component&folder=' + directory;

		if(refresh) {
			this.imageview.location.reload(true);
		}
	},

	getFolder: function() {
		return this.folderlist.getValue();
	},

	upFolder: function()
	{
		var currentFolder = this.folderlist.options[this.folderlist.selectedIndex].text;
		if(currentFolder.length < 2)
			return false;

		var folders = currentFolder.split('/');

		var search = '/';

		for(var i = 0; i < folders.length - 1; i++) {
			search += folders[i];
		}

		for(var i = 0; i < this.folderlist.length; i++)
		{
			var thisFolder = this.folderlist.options[i].text;
			if(thisFolder == search)
			{
				this.folderlist.selectedIndex = i;
				var newFolder = this.folderlist.options[i].value;
				this.setFolder(newFolder);
				break;
			}
		}
	},

	populateFields: function(file) {
		$("f_url").value = "images/stories"+file;
	},

	showMessage: function(text)
	{
		var message  = $('message');
		var messages = $('messages');

		if(message.firstChild)
			message.removeChild(message.firstChild);

		message.appendChild(document.createTextNode(text));
		messages.style.display = "block";
	},

	parseQuery: function(query)
	{
		var params = new Object();
		if (!query) {
			return params;
		}
		var pairs = query.split(/[;&]/);
		for ( var i = 0; i < pairs.length; i++ )
		{
			var KeyVal = pairs[i].split('=');
			if ( ! KeyVal || KeyVal.length != 2 ) {
				continue;
			}
			var key = unescape( KeyVal[0] );
			var val = unescape( KeyVal[1] ).replace(/\+ /g, ' ');
			params[key] = val;
	   }
	   return params;
	}
});

document.imagemanager = null;
document.onload = function(){ document.imagemanager = new JImageManager(window.parent.popup); };

