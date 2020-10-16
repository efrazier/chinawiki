
use Data::Dumper;
use HTML::TableExtract qw(tree);
my $te = HTML::TableExtract->new( );

$html_file='List_of_Chinese_monarchs';

$te->parse_file($html_file);
my $table = $te->first_table_found;
my $table_tree = $table->tree;
my $table_html = $table_tree->as_HTML;
my $table_text = $table_tree->as_text;
my $document_tree = $te->tree;
my $document_html = $document_tree->as_HTML;


#print Dumper $table_tree;

print Dumper $document_tree;
