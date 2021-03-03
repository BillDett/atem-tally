# atem-tally
Controls camera tally lights for Black Magic ATEM switchers

Full credit to robere2 for the original solution (https://github.com/rpitv/atem-tally).  I have just taken this code and simplified it for my use case.

We use a Black Magic switcher to stream our worship services with two cameras.  Since we intermix videos with the live feed, and our control booth is out of sight from the chancel, it was challenging to let the person soon to be on camera when they were actually live.  Our low-cost solution was to have a separate person count them down as the video or musical piece would end.  Commerical studios solve this problem through "tally lights" on their cameras.

This code lets a raspbery pi watch the event stream coming from the Black Magic ATEM switcher and simply enables a GPIO pin when a specific feed goes to the Production stream.  When none of the camera feeds are live, it disables all of the GPIOs.  On two GPIOs we have set up 12V LED indicators on long wires alongside each camera.

# To Run
`$ npm install`
`$ node index.js`

# Configuration
Edit the `tally.config.json` file accordingly for your set up.

Thanks again to robere2 for having exactly what we needed!
