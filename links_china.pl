use warnings;
use utf8;
use open ':encoding(utf8)';
binmode(STDOUT, ":utf8");

use Data::Dumper;
use LWP::UserAgent;
use HTML::LinkExtor;
use URI::URL;
 
$url = "https://en.wikipedia.org/wiki/List_of_Chinese_monarchs";  # for instance
$ua = LWP::UserAgent->new;
 
# Set up a callback that collect image links
my @imgs = ();
sub callback {
   my($tag, %attr) = @_;
   #return if $tag ne 'a';  # we only look closer at <img ...>
   print Dumper \%attr;

   push(@imgs, values %attr);
}
 
# Make the parser.  Unfortunately, we don't know the base yet
# (it might be different from $url)
$p = HTML::LinkExtor->new(\&callback);
 
# Request document and parse it as it arrives
$res = $ua->request(HTTP::Request->new(GET => $url),
                    sub {$p->parse($_[0])});
 
# Expand all image URLs to absolute ones
my $base = $res->base;
@imgs = map { $_ = url($_, $base)->abs; } @imgs;
 
# Print them out
print join("\n", @imgs), "\n";
