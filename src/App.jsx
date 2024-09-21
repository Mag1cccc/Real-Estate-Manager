import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddListingPage } from "./pages/AddListingPage";
import { ApartmentDetail } from "./components/ApartmentDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/add-listing" element={<AddListingPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
