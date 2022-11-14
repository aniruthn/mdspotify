import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Input, Icon, Text, Button } from "react-native-magnus";
import { useDispatch, useSelector } from "react-redux";
import { addToQueue } from "../../redux/songQueue/songQueueSlice";
import { RootState } from "../../redux/store";
import { processSongFeatures } from "../../utils";

type SearchResult = {
  uuid: string;
  title: string;
  audioFile: string;
  artist: string;
  features: string;
  album: string;
  coverArt: string;
};

type SearchResults = SearchResult[];

const SearchScreen = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<
    SearchResults | undefined
  >();
  const queue = useSelector((state: RootState) => state.songQueue.queue);
  const dispatch = useDispatch();
  const searchQueryHandler = async () => {
    const url = new URL("http://localhost:8080/search/");
    url.searchParams.append("searchTerm", searchInputValue);
    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      const songSearchResults = data.songSearchResults as SearchResults;
      const processedSearchResults = songSearchResults.map(
        (songSearchResult) => {
          return {
            ...songSearchResult,
            features: processSongFeatures(songSearchResult.features),
          };
        }
      );
      setSearchResults(processedSearchResults);
    } catch (error: any) {
      console.log(error.toString());
    }
  };
  const DisplaySearchResults = () => {
    if (!searchResults) {
      return <></>;
    }
    if (searchResults.length === 0) {
      return <Text>No results found!</Text>;
    }
    return (
      <ScrollView>
        {searchResults.map((searchResult) => {
          return (
            <View key={searchResult.uuid} style={{ marginVertical: 20 }}>
              <Text>{searchResult.title}</Text>
              <Text>
                {searchResult.artist} feat. {searchResult.features}
              </Text>
              <Text>{searchResult.album}</Text>
              <Button onPress={() => dispatch(addToQueue(searchResult))}>
                Add to Queue
              </Button>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  const SearchButton = () => (
    <TouchableOpacity onPress={searchQueryHandler}>
      <Icon name="search" color="gray100" fontFamily="Feather" />
      {/* to add: clear button, useRef on the input */}
    </TouchableOpacity>
  );
  return (
    <>
      <Input
        placeholder="What do you want to listen to?"
        p={10}
        focusBorderColor="blue700"
        borderColor="gray500"
        value={searchInputValue}
        onChangeText={setSearchInputValue}
        onSubmitEditing={searchQueryHandler}
        autoCorrect={false}
        suffix={<SearchButton />}
      />
      <DisplaySearchResults />
    </>
  );
};

export default SearchScreen;
