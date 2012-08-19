Ext.define('Sample.store.Tracks', {
    extend: 'Ext.data.Store',
    config: {
	    model: 'Sample.model.Track',
	    autoLoad: true,
	    proxy: {
		    type: 'ajax',
		    url: 'app/music.json'
	    }
    }	
});