/**
 * @author Andrea Cammarata (@AndreaCammarata)
 * @www http://www.andreacammarata.com
 * Copyright(c) 2012 SIMACS di Andrea Cammarata
 * @class Sample.view.AudioListItem
 * @extends Ext.dataview.component.DataItem
 * Custom DataView component used inside the tracks view.
 */
Ext.define('Sample.view.AudioListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.tux.AudioCover'],
    xtype: 'audiolistitem',
    config: {
        
        /**
         * A cusom component class that will allow me to define
         * its style using COMPASS an SASS.
         */
        cls: 'x-audio-list-item',
    
        /**
         * Setting up the DataMap object.
         */
        dataMap: {
    
            getTrack: {
                setCoverUrl: 'cover',
                setUrl: 'audio'
            }

        },

        /**
         * @cfg {Ext.tux.AudioCover} track
         * The component that allows the user to see the track cover
         * and hear a preview of the audio file.
         */
        track: {
            xtype: 'audiocover'
        },
    
        /**
         * @cfg {Ext.Component} title
         * The component used to show the Track title.
         */
        title: {
            cls: 'x-track-info',
            tpl: [
                '<div class="title">{title}</div>',
                '<div class="artist">{artist}</div>',
            ]
        },

        /**
         * The component use an 'hbox' stretched layout.
         * In this way the Edit Button will be placed at the
         * right edge of the device screen. */
        layout: {
            type: 'hbox',
            align: 'stretch'
        }

    },

    /**
     * Apply the DataView item Name component.
     * @param {Object} config The configuration Object.
     * @return {Ext.Component} The Name component.
     */
    applyTitle: function(config) {
        return Ext.factory(config, Ext.Component, this.getTitle());
    },

    /**
     * Update the Track title.
     * @param {Ext.Component} newName The new component.
     * @param {Ext.Component} oldName The old component.
     */
    updateTitle: function(newTitle, oldTitle) {
    
        // Get the associated record
        var track = this.getRecord();
    
        /* If is defined a new name component this is added
         * to this DataView component.
         */
        if (oldTitle) {
            this.remove(oldTitle);
        }

        //If is already defined a name component this is removed
        if (newTitle) {
    
            // Apply the track informations
            newTitle.setData({
                title: track.get('title'),
                artist: track.get('artist')
            });
    
            this.add(newTitle);
        }

    },

    /**
     * Apply the DataView Track audio component.
     * @param {Object} config The configuration Object.
     * @return {Ext.tux.AudioCover} The new Audio track component.
     */
    applyTrack: function(config) {
        return Ext.factory(config, Ext.tux.AudioCover, this.getTrack());
    },

    /**
     * Update the Track audio component.
     * @param {Ext.tux.AudioCover} newTrack The new track audio component.
     * @param {Ext.tux.AudioCover} oldTrack The old track audio component.
     */
    updateTrack: function(newTrack, oldTrack) {
    
        /* If is already defined a Track component this
         * will be removed. */
        if (oldTrack) {
            this.remove(oldTrack);
        }
    
        /* If is defined a new Track component this will be added
         * to this DataView component after setting all the required 
         * handlers. */
        if (newTrack) {
    
            newTrack.on({
                play: 'onTrackPlay', 
                stop: 'onTrackStop',
                scope: this
            });
        
            this.add(newTrack);
        }

    },

    /**
     * Callback function called when an audio track
     * will start to play.
     * @param {Ext.tux.AudioCover} track The audio track which starts to play.
     */
    onTrackPlay: function(track){
        
        //Getting the dataview
        var dataview = this.config.dataview,

            // Get the eventually already playing track
            playingTrack = dataview.playingTrack;

        /* If there is an already playing track, then this
         * needs to be stopped and show back the cover face. */
        if(playingTrack){
            playingTrack.showFront();
        }

        // Caching the current playing audio track
        dataview.playingTrack = track;
    
    },

    /**
     * Callback function called when an audio track
     * will stop to play.
     */
    onTrackStop: function(){
        this.config.dataview.playingTrack = null;
    }

});
