<?php

namespace FelipeVa\InertiaTable\Data;

use FelipeVa\InertiaTable\Contracts\TableComponent;
use FelipeVa\InertiaTable\Enums\FilterType;
use FelipeVa\InertiaTable\Traits\Makeable;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapInputName(SnakeCaseMapper::class)]
class Search extends Data implements TableComponent
{
    use Makeable;

    public FilterType $type = FilterType::SEARCH;

    /**
     * @param  string[]  $options
     */
    public function __construct(
        public string $name,
        public string $label,
        public string $placeholder = '',
        public string $selectedOption = '',
        public array $options = [],
        public bool $isGlobal = false,
        public bool $isSelectable = false,
        public ?string $value = null,
    ) {
        if ($name === 'global') {
            $this->isGlobal = true;
        }
    }

    /**
     * @return $this
     */
    public function value(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    /**
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
    public function selectable(): self
    {
        $this->isSelectable = true;

        return $this;
    }

    /**
     * @param  string[]  $options
     * @return $this
     */
    public function options(array $options): self
    {
        $this->options = $options;

        return $this;
    }

    /**
     * @return $this
     */
    public function selectedOption(string $selectedOption): self
    {
        $this->selectedOption = $selectedOption;

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
