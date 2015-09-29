[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/cowie/simpleSDOHeroku)

Simple Demo Org - Heroku Connect (Cirrus Edition)
======================

This is a straightforward demo to show off how you can combine the best of Heroku and Force.com into a multi-part App Cloud demo. This requires some flexibility and use of potentially non-free elements of Heroku, and is mainly for Salesforce SE's - If you are a prospect/customer and would like to see this all in action, please reach out to your friendly neighborhood Salesforce representative.

This will require a total of ZERO code to implement. Point and click, son. Components we need on Salesforce? Nada but the standard stuff. Components we need on Heroku? Postgres, Node, handful of node libraries, and Heroku Connect, everything autodeploying.


Script/Story
-------------
Today we're taking a look at what it looks like to develop a custom app with the App Cloud. In our scenario, we have our internal folk all over Salesforce, which they use for things like CRM, Service, HR, everything from decision making to trip approval to parking lot spot tracking. There has been a recent push for a new consumer market for our fake company, Cirrus, to scale our fake products out to millions of users worldwide. We initially want to just do some basic stuff, share product info, company info wider than ever before, and most terrifyingly, we've bought a ridiculous amount of ad space on the Super Bowl to do it. This means we expect our usual trickle of b2b traffic to explode, but we can't have it impact our existing portals and service, and it's our first impression for millions of users so it has to work and scale appropriately. 

Salesforce is awesome at workflows and everything once these users enter our system, but serving up a page for tens to hundreds of millions of people at once can tax the system, and clutter it with information we don't need. For that, Heroku is a fantastic solution to deploy instantly, and has the rapid scale we need to handle insane counts of users, and Heroku Connect is the glue that ties the two together, a point and click integration between the local databases of Heroku on Postgres, and the Salesforce database where my internal users live, and my queues, workflows and other processes are already in place.

The integration and the workflow rules on the Salesforce side are all done through point and click tools easy enough for Business Analysts and Admins to work on, freeing your developers to build specifically the elements that innovate: The mobile app, its featuresets and intelligence, as opposed to setting up piping for data to flow across systems. It's a faster way to develop the most simple to complex application, for an audience of dozens to hundreds of millions.

Today, we're going to set up and deploy that application, along with wiring up the integration, in minutes. No code, no command line, no joke.

 ###Disclaimer: This looks long, it actually isn't, it's just super detailed for you. Whole process ~5m.

Setup
-------------
### Prep
* Get a copy of the SDO, or any DE org.
* Sign up for a Heroku license. (how do you not have this already)

### Install - could be part of the demo. It's nerdy.
At this point, you can either start the demo now, and show the power of instant deployment, or run this step ahead of time. 
* Hit the Heroku Deploy button above to create a net new Heroku app, no command line required.
* Name your app something you'll remember if you've got a bunch of em. 
* Click the 'Deploy for Free' button at the bottom to start the deployment.
* Click the 'Manage App' button at the bottom - this is your dashboard for the app. Click 'View' to load the actual app itself in your browser.

What you're doing right now is the equivalent of a 'git push heroku master' command, but instead of deploying from code on your local machine, you're deploying direct from my code here. This is a step most devs would take after doing initial testing and dev on their local box and it's time to get started testing in a real environment. 


(OPTIONAL)
* Clone this repository locally, use Heroku Toolbelt to push to Heroku.
Looks cooler, requires command line, only do it if you know what you're doing.

### Demo
* Special Note: If you set this all up over a day ago and haven't run it since then, run your app once by going to whatever.herokuapp.com. For the free dynos, Heroku will sleep your app, causing a considerable lag time at the first run if it's been awhile. Trust me on this one.



(HC - You can do this beforehand if you have a business user / lack of time in the demo)
* After clicking 'Manage App' on the last page (Or, if you didn't, or forgot, or that was days ago, going to https://dashboard.heroku.com/apps and clicking on your app), you'll have your management page. 
* Click on "Heroku Connect" here
* Click on 'Begin Setup' to complete provisioning.
* Click 'Next' (On this page, you're naming the schema in the Heroku database for the Salesforce data. Salesforce is default, and that looks good enough to me.)
* Click "Authorize" - You're now doing an oAuth login into Salesforce so it can get to your datas, your precious, precious datas. Log in and hit allow.
* Create a mapping between Heroku and Salesforce by hitting 'Create Mapping'.
* For the demo, click on Lead. 
* Before mapping fields, at the top, MAKE SURE TO CHECK 'Write to Salesforce any updates to your database'.
* Map the following fields (You can do more, but at the very least, do these): 
** FirstName, LastName, Email
** Click Save
* No lie, you now set up bi-directional, fault resistant, real time integration between PG/Heroku and Salesforce. That's why this thing's good, yo.


(Actual Demo)
* Now it's actually time to demo the app. If you're short on time, you can do the (HC) part early, and just show this. If you do that - 
* Open up Salesforce. Show off leads, talk to the original story above, or don't, whatever, set the stage how you want. You do you.
* Open your app, it's whatever-you-named-it.herokuapp.com. You can do this on your phone for extra points or on your browser. (Protip: Chrome can simulate an iphone fairly easily. Do that.)
* This app is simple, our consumer facing website, pushed instantly out to Heroku, ready to handle the stress of multiple users. 
* Scroll to the bottom to the newsletter, and punch in some information and hit Sign Up! This will send some info to the database, and give you a happy thank you.

(HC)
* Open up your Heroku Connect dashboard, and wait 10 seconds for the poll, or hit 'Poll Now' button.
* Open up new leads today - and your lead should be in there, ready to rock. Talk to partitioning data on one side or the other, working with scale/etc on the Heroku side and easy workflow, etc on the Salesforce side.

## POST DEMO
* I recommend highly you wipe out the heroku app you built for the demo, so you don't end up with 300 apps in your list and get confused in a future demo. 
