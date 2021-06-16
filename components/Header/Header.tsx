import * as React from 'react';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';

export type FormData = {
  category: string;
  keyword: string;
};

export type HeaderProps = {
  onSubmit: (data: FormData) => void;
  options: { value: string; label: string }[];
};

export function Header({ onSubmit, options }: HeaderProps) {
  const formEl = React.useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(options[0].value);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onSubmit(getFormData(formEl.current));
  };
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(getFormData(e.currentTarget));
    },
    [onSubmit]
  );

  return (
    <header>
      <div className="py-2 md:py-4 border-b bg-white">
        <div className="max-w-screen-lg w-full m-auto md:flex md:items-center ">
          <div className="pl-3 md:pl-0 mr-4 md:mr-8 mb-1 md:mb-0 text-xl">FANZA Sales</div>
          <div className="pl-3 md:pl-0 pr-3 md:pr-0 flex-grow">
            <form className="flex" ref={formEl} onSubmit={handleSubmit}>
              <div className="relative w-3/6">
                <select
                  className="appearance-none block bg-transparent pl-2 pr-8 py-1 text-gray-500 text-base focus:outline-none focus:text-gray-800 border border-gray-300 w-full border-r-0"
                  name="category"
                  aria-label="カテゴリ選択"
                  value={selectedValue}
                  onChange={handleChangeSelect}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDownIcon className="fill-current h-4 w-4" />
                </div>
              </div>
              <div className="relative w-full">
                <input
                  className="appearance-none bg-gray-100 border w-full border-gray-300 rounded-r py-1 px-3 pr-8 text-gray-700 focus:outline-none focus:border-blue-500 flex-grow"
                  type="text"
                  placeholder="キーワードから探す"
                  aria-label="キーワード入力"
                  name="keyword"
                  value={inputValue}
                  onChange={handleChangeInput}
                />
                <span className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    className="p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-500"
                    type="submit"
                    aria-label="検索"
                  >
                    <SearchIcon className="w-6 h-6 " />
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

function getFormData(target: HTMLFormElement): FormData {
  const formData = new FormData(target);
  const entries = formData.entries();
  const data = Object.fromEntries(entries) as FormData;
  return data;
}
