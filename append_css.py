import os

CSS_FILE = os.path.join("src", "app", "page.module.css")
CSS_CONTENT = """
/* Search & Filter Controls */
.controlsContainer {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.categoryFilters {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filterBtn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.filterBtn:hover {
  border-color: #94a3b8;
  color: #334155;
}

.activeFilter {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.activeFilter:hover {
  background: #1d4ed8;
  color: white;
  border-color: #1d4ed8;
}

.searchSortContainer {
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.searchInput {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.searchInput:focus {
  outline: none;
  border-color: #2563eb;
}

.sortSelect {
  padding: 0.8rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  background-color: white;
  cursor: pointer;
}

.emptyState {
  text-align: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.1rem;
  grid-column: 1 / -1;
}
"""

with open(CSS_FILE, "a", encoding="utf-8") as f:
    f.write(CSS_CONTENT)

print("CSS appended successfully.")
