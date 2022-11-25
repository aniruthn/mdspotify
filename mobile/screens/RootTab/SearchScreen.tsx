import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Input, Icon, Text, Button } from "react-native-magnus";
import { useDispatch } from "react-redux";
import { BaseURL } from "../../constants";
import { addToQueue } from "../../redux/songQueue/songQueueSlice";
import { processSongFeatures } from "../../utils";
import SongRow from "../../../shared/models/SongRow";

type SearchResult = SongRow;

type SearchResults = SearchResult[];

const SearchScreen = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<
    SearchResults | undefined
  >();
  const dispatch = useDispatch();
  const searchQueryHandler = async () => {
    const url = new URL(`${BaseURL}/search/`);
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
  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    return (
      <View key={item.uuid} style={{ marginVertical: 20 }}>
        <Text>{item.title}</Text>
        <Text>
          {item.artist} feat. {item.features}
        </Text>
        <Text>{item.album}</Text>
        <Button onPress={() => dispatch(addToQueue(item))}>Add to Queue</Button>
      </View>
    );
  };
  const DisplaySearchResults = () => {
    if (!searchResults) {
      return <></>;
    }
    if (searchResults.length === 0) {
      return <Text>No results found!</Text>;
    }
    return (
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.uuid}
      />
    );
  };
  const SearchButton = () => (
    <TouchableOpacity onPress={searchQueryHandler}>
      <Icon name="search" color="gray100" fontFamily="Feather" />
    </TouchableOpacity>
  );
  const ClearButton = () => (
    <TouchableOpacity onPress={() => setSearchInputValue("")}>
      <Icon name="x" color="gray100" fontFamily="Feather" />
    </TouchableOpacity>
  );
  const SuffixButtons = () => (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {searchInputValue && <ClearButton />}
      <SearchButton />
    </View>
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
        suffix={<SuffixButtons />}
      />
      <DisplaySearchResults />
    </>
  );
};

export default SearchScreen;
