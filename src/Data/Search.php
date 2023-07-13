<?php

namespace FelipeVa\InertiaJsTableReact\Data;

use FelipeVa\InertiaJsTableReact\Contracts\TableComponent;
use FelipeVa\InertiaJsTableReact\Enums\FilterType;
use FelipeVa\InertiaJsTableReact\Traits\Makeable;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapInputName(SnakeCaseMapper::class)]
class Search extends Data implements TableComponent
{
    use Makeable;

    public FilterType $type = FilterType::SEARCH;

    /**
     * @param  string  $name
     * @param  string  $label
     * @param  string  $placeholder
     * @param  bool  $isGlobal
     * @param  string|null  $value
     */
    public function __construct(
        public string $name,
        public string $label,
        public string $placeholder = '',
        public bool $isGlobal = false,
        public ?string $value = null,
    ) {
        if ($name === 'global') {
            $this->isGlobal = true;
        }
    }

    /**
     * @param  string  $value
     * @return $this
     */
    public function value(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    /**
     * @param  string  $placeholder
     * @return $this
     */
    public function placeholder(string $placeholder): self
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    /**
     * @return $this
     */
    public function global(): self
    {
        $this->isGlobal = true;

        return $this;
    }
}
