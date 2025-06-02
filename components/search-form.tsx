"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SearchFormProps {
  initialQuery?: string;
  initialLanguage?: string;
  initialSort?: string;
}

export function SearchForm({
  initialQuery = "",
  initialLanguage = "any",
  initialSort = "stars",
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [language, setLanguage] = useState(initialLanguage);
  const [sort, setSort] = useState(initialSort);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev); // Use functional update to ensure latest state
  };

  return (
    <section id="search" className="w-full py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Search GitHub Repositories
            </CardTitle>
            <CardDescription>
              Find repositories by name, description, language, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/search" method="get" className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="q">Search Query</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="q"
                    name="q"
                    type="text"
                    placeholder="React state management, CSS framework, etc."
                    className="pl-8"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Toggle Advanced Filters */}
              {/* <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={toggleAdvanced}
              >
                <Filter className="h-4 w-4" />
                {showAdvanced
                  ? "Hide Advanced Filters"
                  : "Show Advanced Filters"}
              </Button> */}

              {/* Advanced Filters Section */}
              {showAdvanced && (
                <div className="border rounded-md p-4 mt-4 animate-fadeIn">
                  <div className="grid gap-4 py-2 md:grid-cols-2">
                    {/* Language Select */}
                    {/* <div className="flex flex-col space-y-2">
                      <Label htmlFor="language">Programming Language</Label>
                      <Select
                        value={language}
                        onValueChange={setLanguage}
                        name="language"
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Any language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any language</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="go">Go</SelectItem>
                          <SelectItem value="rust">Rust</SelectItem>
                          <SelectItem value="c++">C++</SelectItem>
                          <SelectItem value="php">PHP</SelectItem>
                          <SelectItem value="ruby">Ruby</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}

                    {/* Sort By Select */}
                    {/* <div className="flex flex-col space-y-2">
                      <Label htmlFor="sort">Sort By</Label>
                      <Select value={sort} onValueChange={setSort} name="sort">
                        <SelectTrigger id="sort">
                          <SelectValue placeholder="Stars" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stars">Stars</SelectItem>
                          <SelectItem value="forks">Forks</SelectItem>
                          <SelectItem value="updated">Recently Updated</SelectItem>
                          <SelectItem value="relevance">Relevance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Search Repositories
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            All searches are performed securely. We don&apos;t track your search
            history or store personal data.
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}