const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

// Find sunvisor and update images
let sunvisor = data.find(item => item.id === 'item-sunvisor-1');
if(sunvisor) {
  sunvisor.additionalImages = [
    'https://blog.kakaocdn.net/dna/cvg8Ae/dJMcaarPRkr/AAAAAAAAAAAAAAAAAAAAACvcA5gJkC8PFIZd3pYfKIZKaLA64tn4JLrNlZZ3Dp1J/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=FsvI3nYjiFj5vKMh8DkBU3QEYt0%3D',
    'https://blog.kakaocdn.net/dna/bFoiMS/dJMcahLfuHI/AAAAAAAAAAAAAAAAAAAAAEbTkEjOMHIUyVj2vaRvkAamKN5Kd08G2ZA1cMNc7DRG/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=gKKPb43i7jtDvxjvrFOX8DQ6rpM%3D',
    'https://blog.kakaocdn.net/dna/c5GyRz/dJMcahxIG8J/AAAAAAAAAAAAAAAAAAAAAPiKBcaciPwaLarTozZpo6ETmPfH4i191OSgrby-KC8O/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=%2BCF0ae12TjG9yT4rhI0zbtV7PvE%3D',
    'https://blog.kakaocdn.net/dna/qSqsJ/dJMcaii4qBq/AAAAAAAAAAAAAAAAAAAAAIJ6R-4bXqfL4FoNQshLYFyLEcHFYH1hjWyrTou5UJ4N/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=c4GU%2BsQRXclcCw2yV9SsB%2BpZOH4%3D'
  ];
  fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
  console.log('Updated sunvisor images');
}
