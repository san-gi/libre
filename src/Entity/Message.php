<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\MessageRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     
 *      normalizationContext={"groups"={"readMessage"}},
 *      collectionOperations={
 *          "get",
 *          "post"={
 *              "controller"=App\Controller\MessageCreateController::class
 *          }
 *      },
 *      itemOperations={"get","delete","put"},
 * )
 * @ORM\Entity(repositoryClass=MessageRepository::class)
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"readMessage"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=2550)
     * @Groups({"readMessage"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="messages")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"readMessage"})
     */
    private $author;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"readMessage"})
     */
    private $date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate( $date): self
    {
        
        $this->date = new DateTime(date('Y-m-d H:i:s'));

        return $this;
    }
}
