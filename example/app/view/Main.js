Ext.define('Sample.view.Main', {
    extend: 'Ext.DataView',
    requires: [
        'Sample.view.AudioListItem'
    ],
    config: {
	    cls: 'sample-main-view',
	    store: 'Tracks',
	    useComponents: true,
        defaultType: 'audiolistitem',
        items: [
            {
	            xtype: 'toolbar',
	            docked: 'top',
	            title: 'Playlist'
            }
        ]
    }
});