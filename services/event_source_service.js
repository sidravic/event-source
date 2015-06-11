var eventSource = [];
var busUrl = 'amqp://localhost:5672'
var serviceBus = require('servicebus').bus({url: busUrl, enableConfirms: true});
debugger;
serviceBus.use(serviceBus.package());
serviceBus.use(serviceBus.correlate());
//serviceBus.use(serviceBus.log());
serviceBus.use(serviceBus.retry());


var eventSourceService = {
		add: function(eventName, params){
			eventSource.push({event: eventName, params: params})			
		},

		get: function(lastIndex){
			if(eventSource.length < (lastIndex + 1))
				eventSource[lastIndex + 1];
		},

		init: function(){
			var self = this;
			
			console.log('Listening on events...');
		
			serviceBus.listen('newEventArrived', {durable: true, ack: true, persistent: true}, function(event){									
			  console.log(event);
				self.add(event.event, event.params);	
				
				if (Math.random() > 0.6){					
					console.log("--------------------------- EVENT REJECTED " + event.cid.toString() + " -----------------------")
					event.handle.reject();
				}
				else
					event.handle.ack();
			});	
			
			//serviceBus.send('newEventArrived', {event: 'test', params: 'test'});
		}
}

module.exports = eventSourceService;