/**
 * @class Ext.tux.AudioCover
 * @extend Ext.Audio
 * @author Andrea Cammarata (@AndreaCammarata)
 * @www http://www.andreacammarata.com
 * Copyright(c) 2012 SIMACS di Andrea Cammarata
 */
Ext.define('Ext.tux.AudioCover',{
    extend: 'Ext.Audio',
    xtype: 'audiocover',
    requires: ['Ext.Button'],
    config: {  
    
        /**
         * @cfg coverUrl
         * The url of the picture used as the cover of the audio file.
         * @accessor
         */
        coverUrl: null,

        /**
         * @cfg {Object} stopButton
         * The configuration for the stop button.
         */
        stopButton: {
            iconMask: true,
            iconCls: 'stop',
            ui: 'white'
        }

    },
    cachedConfig: {

        /**
         * @cfg baseCls
         * The base CSS class used to render the component.
         * @accessor
         */
        baseCls: 'x-tux-audiocover',

        /**
         * @cfg enableControls
         * Hide the default browser controls because we are going
         * to provide a custom UI to control the audio file.
         * @accessor
         */
        enableControls: false
    
    },
    template: [
        {
            // The media element is required
            reference: 'media',
            preload: 'auto',
            tag: 'audio'
        },
        {
            cls: 'x-flip-card',
            reference: 'cardEl',
            children: [
                {
                    cls: 'x-face x-front',
                    reference: 'coverEl'
                },
                {
                    cls: 'x-face x-back',
                    children: [
                        {
                            cls: 'x-progress',
                            reference: 'progressEl',
                            children: [
                                {
                                    cls: 'x-slice x-half',
                                    children: [
                                        { 
                                            reference: 'slice1' 
                                        }
                                    ]
                                 },
                                 {
                                     cls: 'x-slice x-end',
                                     children: [
                                        { 
                                            reference: 'slice2'
                                        }
                                     ]
                                 }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    /**
     * Component initialization function.
     * @private
     */
    initialize: function(){

        var me = this;

        /* Set the listeners to the Ext.Audio functions
         * that will allow us to syncronize the progress time
         * with the slices childs rotation. */
        me.on({
            timeupdate: 'onUpdateTime',
            ended: 'showFront',
            scope: me
        });

        /* Set the handler on the cover element to show the back
         * face when the user tap on it. */
        me.coverEl.on('tap', 'showBack', me);

        // Initialize the Ext.Audio component
        me.callParent(arguments);
    
    },

    /**
     * Show the cover face and stop the audio.
     */
    showFront: function(){
        this.flip(true);
    },
    
    /**
     * Show the progressbar face and start the audio.
     */
    showBack: function(){
        this.flip(false);
    },

    /**
     * Flip the card to the front / back face after
     * playing / stopping the audio file.
     * @param {Boolean} toFront True to show the front cover face, otherwise
     * will be shown the back progressbar one.
     * @private
     */
    flip: function(toFront){
    
        // Play or stop tha audio file
        this[toFront ? 'stop' : 'play']();
    
        // Flip the card element
        this.cardEl.setStyle('-webkit-transform', Ext.String.format('rotateY({0}deg)', toFront ? 0 : 180));
    
    },

    /**
     * Create the stop button and update the getStopButton reference.
     * @param {Object} config The configuration used to create the button.
     * @private
     */
    applyStopButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getStopButton());
    },
    
    /**
     * Update the Stop button creating the new one and destroying
     * the old one if any.
     * @param {Ext.Button} newButton The new button created.
     * @param {Ext.Button} oldButton The old button that eventually already exists.
     * @private
     */
    updateStopButton: function(newButton, oldButton){
    
        if (newButton) {
            newButton.renderTo(this.progressEl);
            newButton.on('tap', 'showFront', this);
        }
        else if (oldButton) {
            oldButton.destroy();
        }
        
    },

    /**
     * Core component function used to syncronize the slices
     * rotation to simulate the progress effect. 
     * This function is called everytime the Media element changes
     * is current time.
     * @param {Ext.Media} media The linked media element.
     * @param {Number} time The current media time in seconds.
     * @private.
     */
    onUpdateTime: function(media, time){

        var deg1 = 0,
            deg2 = 180;

        if(time === 0) {
            return;
        }
        
        // Let's calculate the new slice rotation
        var sliceDeg = (time * 360) / this.getDuration();

        if(sliceDeg === 0) {
            return;
        }
        
        /* If the current time passed the half, we need to rotate
         * the sencond slice instead of the first one. */
        if(sliceDeg > 180) {
            deg1 = 180;
            deg2 = sliceDeg;
        } else {
            deg1 = sliceDeg;
        }

        // Rotate the slices to simulate to syncronize the progress
        this.slice1.setStyle('-webkit-transform', Ext.String.format('rotateZ({0}deg)', deg1));
        this.slice2.setStyle('-webkit-transform', Ext.String.format('rotateZ({0}deg)', deg2));
    
    },

    /**
     * Update tha audio cover Url.
     * @param {String} value The new audio cover Url.
     * @private
     */
    updateCoverUrl: function(value){
        this.coverEl.setStyle('background', Ext.String.format('url({0})', value));
    }

});