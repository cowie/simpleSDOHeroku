Simple Demo Org - Heroku Connect (HLS/Medical Edition)
======================

This is a straightforward demo to show off how you can combine the best of Heroku and Force.com into a multi-part App Cloud demo. This requires some flexibility and use of potentially non-free elements of Heroku, and is mainly for Salesforce SE's or for review. Deploying may impact your spend with Heroku if you're external, so reach out to your Salesforce/Heroku contacts for more information.

This will require a total of ZERO code to implement. Point and click, son. Components we need on Salesforce? Nada but the standard stuff. Components we need on Heroku? Postgres, Node, handful of node libraries, and Heroku Connect, most of which will autodeploy for us.


Script/Story
-------------
Today we're taking a look at what it looks like to develop a custom app with the App Cloud. In our scenario, we have our internal folk all over Salesforce, which they use for things like rounding apps, care planning, scheduling, the works. There has been a recent push for custom mobile applications as a way to get the Ask-a-Nurse hotline to scale out to millions of users. We want to do some basic stuff, sharing information, collecting biometrics on IoT devices, but also push information out, in this case, that an Influenza breakout is occurring, and alerts should be pushed if users are within specific geographical regions. We want to collect information on counts of people in these areas reporting symptoms for analytics and followup, but most importantly, identify ahead of time those who are part of high risk populations reporting symptoms, so we can get in front of them and potentially save their lives.

Salesforce is phenomenal at workflows once we've identified these high risk people, but the problem we have is serving up a page that, in the event of a global epidemic, may get extremely high spikes of usages in tens to hundreds of millions of concurrent users. For that, Heroku is a fantastic solution to deploy instantly, and scale rapidly to handle even those levels of users, and Heroku Connect is the glue that ties the two together, making it easy to pass the high risk patient information over to Salesforce for follow-up, according to our existing workflow rules.

The integration and the workflow rules on the Salesforce side are all done through point and click tools easy enough for Business Analysts and Admins to work on, freeing your developers to build specifically the elements that innovate: The mobile app, its featuresets and intelligence, as opposed to setting up piping for data to flow across systems. It's a faster way to develop the most simple to complex application, for an audience of dozens to hundreds of millions.

Today, we're going to set up and deploy that application, along with wiring up the integration, in minutes.


Setup
-------------
### Prep
* Get an SDO or Developer Edition spun up of Force.com
* Sign up for a Heroku license. 

### Install
At this point, you can either start the demo now, and show the power of instant deployment, or run this step ahead of time. 
* Hit the Heroku Deploy button above to create a net new Heroku app, no command line required.
What you're doing right now is the equivilant of a 'git push heroku master' command, but instead of deploying from code on your local machine, you're deploying direct from my code here. This is a step most devs would take after doing initial testing and dev on their local box and it's time to get started testing in a real environment.

(OPTIONAL)
* Clone this repository locally, use Heroku Toolbelt to push to Heroku.
Looks cooler, only do it if you know what you're doing.

### Demo
* Once your Heroku app is up and running, go check it out, preferably from a mobile device. 
* Before doing anything in it, go to dashboard.heroku.com and log in. Here you'll see your apps.
* Click on the name of the app you just deployed. If you're new to Heroku, its the only one, so that's easy.
* Where it says Add-ons, type in Heroku Connect, and select it. In the box that pops up, hit 'Provision'

* Click/tap on the "Report Symptoms" button to go to the form asking for information.
Selecting any of the buttons will add you to a high risk category and make some specific things happen.

* If you are high risk, the code will push the new record into the database meant to map with Salesforce. Good things will happen.
