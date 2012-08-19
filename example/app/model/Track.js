Ext.define('Sample.model.Track', {
    extend: 'Ext.data.Model',
    config: {
	    fields: [
	        { name: 'id',     type: 'int'    },
	        { name: 'title',  type: 'string' },
	        { name: 'artist', type: 'string' },
	        { name: 'cover',  type: 'string' },
	        { name: 'audio',  type: 'string' }
	    ]
    }	
});