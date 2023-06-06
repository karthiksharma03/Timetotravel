const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Sample ticket data
let tickets = [
  { id: 1, source: 'City A', destination: 'City B', date: '2023-05-20', price: 50, booked: false },
  { id: 2, source: 'City B', destination: 'City C', date: '2023-06-05', price: 75, booked: false },
  { id: 3, source: 'City A', destination: 'City C', date: '2023-05-25', price: 60, booked: false },
];

app.get('/api/tickets', (req, res) => {
  const { source, destination, date } = req.query;

  const filteredTickets = tickets.filter(ticket => 
    ticket.source.toLowerCase() === source.toLowerCase() &&
    ticket.destination.toLowerCase() === destination.toLowerCase() &&
    ticket.date === date &&
    !ticket.booked
  );

  res.json({ tickets: filteredTickets });
});

app.post('/api/tickets/:id/book', (req, res) => {
  const ticketId = parseInt(req.params.id);

  const ticket = tickets.find(ticket => ticket.id === ticketId);

  if (ticket && !ticket.booked) {
    ticket.booked = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
