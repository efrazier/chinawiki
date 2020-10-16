use MediaWiki::API;
use IO::Socket::SSL;


my $mw = MediaWiki::API->new();
$mw->{config}->{api_url} = 'https://en.wikipedia.org/w/api.php';
 
# log in to the wiki
$mw->login( { lgname => 'Efrazier333', lgpassword => 'BOBisGOD6!' } )
  || die $mw->{error}->{code} . ': ' . $mw->{error}->{details};


# get some page contents
my $page = $mw->get_page( { title => 'Lists_of_emperors#Asian' } );
# print page contents
#print $page->{'*'};  


print $page->{'title'};
